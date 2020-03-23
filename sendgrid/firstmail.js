// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
//process.env.SENDGRID_API_KEY
sgMail.setApiKey('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');
sgMail.setSubstitutionWrappers("{{", "}}");

const dynamic_data = {
  volName: 'Tony Kam',
  volEmail: 'tony.shek.kam@gmail.com',
  userName: 'Tony Kam',
  userEmail: 't.kam@berkeley.edu'

}

// WORKING CODE BELOW
const msgVolunteer = {
  to: dynamic_data.volEmail,
  from: 'safewayvolunteer@gmail.com',
  templateId: 'd-f1e47756dd5b4db98006da04fa47c7be', //template on sendgrid
  dynamic_template_data: {
    volName: dynamic_data.volName,
    userName: dynamic_data.userName,
    userEmail: dynamic_data.userEmail,
  }
};
sgMail.send(msgVolunteer);

const msgUser = {
  to: dynamic_data.userEmail,
  from: 'safewayvolunteer@gmail.com',
  templateId: 'd-26d1a25c60e546a3a027ebe9f9b4e7f6', //template on sendgrid
  dynamic_template_data: {
    userName: dynamic_data.userName,
    volName: dynamic_data.volName,
    volEmail: dynamic_data.volEmail,
  }
};

sgMail.send(msgUser);

//
//Handlebar testing
/*
const handlebartest = {
  to: 'tony.shek.kam@gmail.com',
  from: 'safewayvolunteer@gmail.com',
  templateId: 'd-a312641aed04432c96534a974735f2ff', //template on sendgrid
  dynamic_template_data: {
    'username': 'Tonyykam',
  }
};
sgMail.send(handlebartest);
*/

/*
const msgVolunteer = {
  to: 'tony.shek.kam@gmail.com',
  from: 'safewayvolunteer@gmail.com',
  templateId: 'd-f1e47756dd5b4db98006da04fa47c7be', //template on sendgrid
  dynamic_template_data: {
    volName: 'Tony Kam',
    userName: 'Tony Kam',
    userEmail: 't.kam@berkeley.edu',
  }
};
sgMail.send(msgVolunteer);
*/
