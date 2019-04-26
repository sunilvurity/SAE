import { Component , OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material';
import { SocialactivityService } from "@app/services/socialactivity.service";

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'direct-message',
  styleUrls: ['direct-message.component.scss'],
  templateUrl: 'direct-message.component.html',
})
export class DirectMessageComponent implements OnInit{
    ngOnInit() {
        this.message = {directMessage: "test direct message"};
    }
    
    constructor(private socialActivityService: SocialactivityService) {}
    message: {directMessage: string};
    onSubmit() {
        //let message =this.directMessage;
        //this.message = {dMessage: "test direct message"};
        console.log("submit: " + this.message.directMessage);
        this.socialActivityService.sendDirectMessage(this.message.directMessage);
    }
}