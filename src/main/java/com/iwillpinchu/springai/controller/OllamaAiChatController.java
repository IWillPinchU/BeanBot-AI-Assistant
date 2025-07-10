package com.iwillpinchu.springai.controller;


import com.iwillpinchu.springai.service.OllamaAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ollama-chat")
@CrossOrigin(origins = "http://localhost:3000")
public class OllamaAiChatController {

    private final OllamaAiService ollamaAiChatService;

    public OllamaAiChatController(OllamaAiService ollamaAiChatService) {
        this.ollamaAiChatService = ollamaAiChatService;
    }

    @GetMapping("/{prompt}")
    public ResponseEntity<String> ollamaAiChat(@PathVariable(required = true) String prompt){
        String response = ollamaAiChatService.getAnswer(prompt);
        return ResponseEntity.ok(response);
    }
}
