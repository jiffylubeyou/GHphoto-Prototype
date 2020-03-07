let express = require('express');
var fs = require('fs');
let gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();

GPhoto.setLogLevel(1);
GPhoto.on('log', function (level, domain, message) {
  console.log(domain, message);
});
/*GPhoto.list((cameras) => {cameras.forEach((element) => {
console.log(camera);    
});})*/

function listCameras() {
    GPhoto.list(function (list) {
    if (list.length === 0) return;
    var camera = list[0];
    //list cameras in console
    list.forEach(element => {
      console.log('Found', element.model)
    });

    /*//get camera data
    list.forEach(element => {
      getconfig(element);
    })*/

    /*//autofocus cameras
    list.forEach(element => {
      element.setConfigValue('autofocusdrive', 1, function (er) {
        //..
      })});*/

    //take photos
    let index = 0;
    list.forEach(element => {
      takePhoto(element, index);
      console.log(index);
      index++;
    })
})};
function takePhoto(camera, pictureNameIndex){
    camera.takePicture({download: true}, function (er, data)
    {fs.writeFileSync(__dirname + '/picture' + pictureNameIndex + '.jpg', data);
})};

function getconfig(camera) {
  camera.getConfig(function (er, settings) {
    console.log(settings);
  });
}

listCameras();