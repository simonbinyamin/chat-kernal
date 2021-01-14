package com.example.kernal;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class ChatController {


	@MessageMapping("/start")
	@SendTo("/topic/msgs")
	public Msg msg(Body message) throws Exception {
		Thread.sleep(1000);
		return new Msg(">>" + HtmlUtils.htmlEscape(message.getName()) + "!");
	}

}
