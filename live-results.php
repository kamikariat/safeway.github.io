<!DOCTYPE html>
<html lang="en" dir="ltr">
<style type="text/css">
  .button {
  background-color: #ffd700; /* Green */
  border: none;
  color: black;
  padding: 15px 10px;
  margin-right: 10px;
  //margin-left: 1.5px;
  font-weight:400;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10%;
  }
  .buttons{
    text-align: center;
    margin-bottom: 10px;
  }
  table.t2 {
    //width: 50%;
    //border-spacing: 0px;
    height:400px;
    //width:800px;
    border-collapse: collapse;
    font-family: Calibri;
    overflow: auto;
    display:inline-block;
    //border-right: none;
  }
  .t2 caption {
    padding-bottom: 0.5em;
    font-weight: bold;
    font-size: 20px;
  }

  .t2 th, .t2 td {
    padding: 4px 8px;
    border: 2px solid #fff;
    background: #e88574;
    font-weight: 800;
  }
  .t2 thead th {
    padding: 2px 8px;
    background: #ffd700; //header
    text-align: justify;
    font-weight: normal;
    font-size: 13px;
    color: #fff;
  }
  .t2 tbody tr:nth-child(odd) *:nth-child(even), .t2 tbody tr:nth-child(even) *:nth-child(odd) {
    background: #9e3f2f;
  }
  .t2 tfoot th {
    padding: 2px 8px;
    background: #ffd700;
    text-align: justify;
    font-weight: normal;
    font-size: 15px;
    color: #000000;
  }
  .t2 tr *:nth-child(3), .t2 tr *:nth-child(4) {
    text-align: justify;
  }


</style>
  <head>
    <meta charset="utf-8">
    <title>Cross Country "Live" Results</title>
  </head>
  <body>
    <?php
    function live(){
        $return = '';
        $directory = "files";
        $files = glob($directory."/*.lif");
        $files = array_filter($files, function ($file) { return filemtime($file) >= time() - 5000*60; /* modified in the last 5 minutes */ });
        for($i = 0; $i < sizeof($files); $i++){

        $current = $files[$i];
        $handle = fopen($current, "r");
        $line = fgets($handle);
        $line = explode(",",$line);
        $return .= ("<div class=buttons>");
        $return .= ("<h1>".$line[3]."</h1>");
        $lastUpdated = time() - filemtime($current);
        $return .= ("<table id=\"results\" class=t2 summary=".$line[3].">"."<caption>".$line[3]."</caption>
        <thead>
        <tr><th>Place</th><th>Name</th><th>School</th><th>Time</th></tr>
        </thead>
        <tfoot>
        <tr><th colspan=4>Last Updated: ".$lastUpdated." seconds ago(refreh for newest results)</th></tr>
        <div class=buttons>
        <button id=\"Refresh\" class=button onclick=location.reload();>Refresh</button>
        <button id=\"Scroll\" class=button onclick=scrollToTop();>Scroll-To-Top</button>
        </div>
        </tfoot>
        <tbody>");

        while(!feof($handle)){
          $line = fgets($handle);
          if(strlen($line)>0){
            $line = explode(",",$line);
            $line = array_filter($line, function ($line) { return strlen($line) > 0;});
            $return .= ("<tr><th>".$line[0]."</th><td>".$line[3].", ".$line[4]."</td><td>".$line[5]."</td><td>".$line[6]."</td></tr>");
          }
        }
        fclose($handle);
        $return .= ("</tbody></table>");


        $return .= ("</div>");
        $return .=  ("<br>");
      }
      return $return;
}
echo(live());
     ?>
     <script>
       onload = function(){
         var tableElement = document.getElementById('results');
         tableElement.scrollTop = tableElement.scrollHeight;
       }
       function scrollToTop(){
         var tableElement = document.getElementById('results');
         tableElement.scrollTop = 0;
       }
     </script>
  </body>
</html>
