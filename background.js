var images = ["http://ib2.huluim.com/video/60376901?size=580x320&img=1", "http://ib2.huluim.com/video/60366793?size=580x320&img=1", "http://ib4.huluim.com/video/60372951?size=580x320&img=1", "http://ib1.huluim.com/video/60365336?size=580x320&img=1", "http://ib3.huluim.com/video/60376290?size=580x320&img=1", "http://ib4.huluim.com/video/60377231?size=580x320&img=1", "http://ib4.huluim.com/video/60312203?size=580x320&img=1", "http://ib1.huluim.com/video/60376972?size=580x320&img=1", "http://ib4.huluim.com/video/60376971?size=580x320&img=1", "http://ib1.huluim.com/video/60376616?size=580x320&img=1"];

function loop() {
    for (var i = 0; i < 10; i++) {
        xhr(images[i]);
    }
}

function xhr(imageUrl) {
    var x = new XMLHttpRequest();
    x.open('GET', 'http://cors-anywhere.herokuapp.com/' + imageUrl);
    x.responseType = 'blob';
    x.onload = function() {
        var blob = x.response;
        var fr = new FileReader();
        fr.onloadend = function() {
            var dataUrl = fr.result;
            chrome.notifications.create('', {
                type: 'image',
                iconUrl: 'logo_128x128.png',
                title: 'String(i)',
                message: 'message',
                imageUrl: dataUrl
            }, function(id) {});
        };
        fr.readAsDataURL(blob);
    };
    x.send();

}

//loop();

//var logo = new Image();
//logo.onload = loop;
//logo.src = chrome.extension.getURL('logo_128x128.png');
/*
 * Gets the data URL for an image URL
 */
function getDataURL(i) {
    var x = new XMLHttpRequest();
    x.open('GET', images[i]);
    x.responseType = 'blob';
    x.onload = function() {
        var blob = x.response;
    };
    var img = new Image();
    img.width = 580;
    img.height = 320;

    img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = 360;
        canvas.height = 240;
        console.log(this.width);
        console.log(this.height);
        var ctx = canvas.getContext('2d');

        ctx.drawImage(this, 0, 0);
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);
        var dataURL = canvas.toDataURL('image/png');
        console.log(dataURL);
        chrome.notifications.create('', {
            type: 'image',
            iconUrl: 'logo_128x128.png',
            title: String(i),
            message: 'message',
            imageUrl: dataURL
        }, function(id) {});
    }

    //img.src = chrome.extension.getURL('logo_128x128.png');;
    img.src = images[i];
}


// Code from Epistemex
var urls = ["http://ib2.huluim.com/video/60376901?size=290x160&img=1",
    "http://ib2.huluim.com/video/60366793?size=580x320&img=1",
    "http://ib4.huluim.com/video/60372951?size=580x320&img=1",
    "http://ib1.huluim.com/video/60365336?size=580x320&img=1",
    "http://ib3.huluim.com/video/60376290?size=580x320&img=1",
    "http://ib4.huluim.com/video/60377231?size=580x320&img=1",
    "http://ib4.huluim.com/video/60312203?size=580x320&img=1",
    "http://ib1.huluim.com/video/60376972?size=580x320&img=1",
    "http://ib4.huluim.com/video/60376971?size=580x320&img=1",
    "http://ib1.huluim.com/video/60376616?size=580x320&img=1"];

var images = [],            // store image objects
    count = urls.length;    // for loader

for (var i = 0; i < urls.length; i++) {
    var img = new Image();         // create image
    img.onload = loader;         // share loader handler
    img.src = urls[i];           // start loading
    images.push(img);            // push image object in array
}

function loader() {
    count--;
    //if (count === 0) process();  // all loaded, start processing
}
function process() {

    // share a single canvas (use clearRect() later if needed)
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        current = 0;

    canvas.width = 360;
    canvas.height = 240;

    createImage();             // invoke processing for first image

    function createImage() {

        ctx.drawImage(images[current], 0, 0); // draw current image
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        chrome.notifications.create('', {
            type    : 'image',
            iconUrl : 'logo_128x128.png',
            title   : 'String(i)',
            message : 'message',
            imageUrl: canvas.toDataURL()  // png is default

        },
        function(id) {                    // use callback
            current++;                    // next in queue
            if (current < images.length) {
                createImage();            // call again if more images
            }
            else {
                done();                   // we're done -> continue to done()
            }
        });
    }
}
function done() {
    console.log(arguments);
}
function createNotification(i) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = 360;
    canvas.height = 240;


    ctx.drawImage(images[i], 0, 0); // draw current image
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (10, 10, 55, 50);

    chrome.notifications.create('', {
        type    : 'image',
        iconUrl : 'logo_128x128.png',
        title   : 'String(i)',
        message : 'message',
        imageUrl: canvas.toDataURL()  // png is default

    },
    function(id) {                    // use callback
    });
}
