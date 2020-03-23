import * as functions from 'firebase-functions'
import * as firebase from 'firebase'

firebase.initializeApp(firebaseConfig);
var database = firebase.database()

export const onNewUser = functions.database.ref('/shoppers/{shopperId}')
.onCreate((snapshot, context) => {
    const shopperId = context.params.shopperId
    const shopperData = snapshot.val()

    const userLat = shopperData.lat
    const userLong = shopperData.long

    findClosest(userLat, userLong, shopperData.name, shopperData.email)

    return database.ref('shoppers').child(shopperId ).remove()

});

function findClosest(userLat: number, userLong: number, userName: string, userEmail: string) {
    var minDistance = 200
    var tempDistance 
    var ref = database.ref('volunteers')
    ref.on('value',  snap => {
        const data = snap.val()
        const keys = Object.keys(data);
        var close = data[keys[0]];
        for (var i = 0; i < keys.length; i++)
        {
            var k = keys[i]
            tempDistance = distance(userLat, userLong, data[k].lat, data[k].long)
            if (tempDistance < minDistance)
            {
                minDistance = tempDistance
                close = data[k]
            }
        }
        writePair(userName, userEmail, close.name, close.email)
    })
}; 

function writePair(userName: string, userEmail: string, volName: string, volEmail: string)
{
    
    database.ref().child('pairs').push().set({
        'volName': volName,
        'volEmail': volEmail,
        'userName': userName,
        'userEmail': userEmail
    }).catch(err => console.log('error'))
    .then(() => console.log('this will succeed'))
    .catch(() => 'obligatory catch');
}

function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return dist;
	}
}
 
