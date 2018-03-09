import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import * as gifshot from 'gifshot'
import * as downloadjs from 'downloadjs'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public imageLinks = [];
  public downloadLink = "";

  constructor(private testService: TestService) { }

  ngOnInit() {
    var ag = this;
    this.imageLinks = [
      '../assets/image/test1.jpg',
      '../assets/image/test2.jpg',
      '../assets/image/test3.jpg'
    ];

    gifshot.createGIF({
      gifWidth: 350,
      gifHeight: 400,
      images: this.imageLinks,
      interval: 1,
      numFrames: 10,
      frameDuration: 1,
      fontWeight: 'normal',
      fontSize: '16px',
      fontFamily: 'sans-serif',
      fontColor: '#ffffff',
      textAlign: 'center',
      textBaseline: 'bottom',
      sampleInterval: 10,
      numWorkers: 2
    }, function (obj) {
      if (!obj.error) {
        var image = obj.image, animatedImage = document.createElement('img');
        animatedImage.src = image;
        //document.body.appendChild(animatedImage);
        document.getElementById("gif_test").appendChild(animatedImage);
        console.log(image);
        ag.downloadLink = image;
      }
    });
  }

  sendMail() {
    this.testService.sendMail();
  }

  download() {
    //var url = this.downloadLink.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
    //url.download = "test.gif";
    //location.href = url;

    //var link = document.createElement("a");
    //link.download = "test.gif";
    //link.href = this.downloadLink.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
    //link.click();

    downloadjs(this.downloadLink, "test.gif", "image/gif");
  }
}

