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

    //autofocus cameras
    /*autoFocusAll(list);*/

    //set all cameras to save as JPEGs
    /*setAllJpeg(list);*/

    //save to specific directories

    //take photos
    takePhotos(list);
})};

function takePhotos(list) {
  let index = 0;
  list.forEach(element => {
    element.takePicture({download: true}, function (er, data)
    {fs.writeFileSync(__dirname + '/picture' + index + '.jpg', data);
  });
  console.log(index);
  index++;
});};

function getconfig(camera) {
  camera.getConfig(function (er, settings) {
    console.log(settings);
  });
}

function autoFocusAll(list) {
  list.forEach(element => {
    element.setConfigValue('autofocusdrive', 1, function (er) {
      //..
    })});
}

function setAllJpeg(list) {
  list.forEach(element => {
    element.setConfigValue('imagequality', 1, function (er) {
      //..
    })});
}

listCameras();