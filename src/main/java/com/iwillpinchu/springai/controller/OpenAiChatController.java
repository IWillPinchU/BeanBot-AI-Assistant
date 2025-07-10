package com.iwillpinchu.springai.controller;


import com.iwillpinchu.springai.service.OpenAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/openai-chat")
@CrossOrigin(origins = "http://localhost:3000")
public class OpenAiChatController {

    private final OpenAiService openAiChatService;

    public OpenAiChatController(OpenAiService openAiChatService) {
        this.openAiChatService = openAiChatService;
    }

    @GetMapping("/{prompt}")
    public ResponseEntity<String> openAiChat(@PathVariable(required = true) String prompt){
        String response = openAiChatService.getAnswer(prompt);
        return ResponseEntity.ok(response);
    }
}
