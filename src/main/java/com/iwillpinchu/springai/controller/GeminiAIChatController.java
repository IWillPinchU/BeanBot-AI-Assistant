package com.iwillpinchu.springai.controller;


import com.iwillpinchu.springai.service.GeminiAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gemini-chat")
@CrossOrigin(origins = "http://localhost:3000")
public class GeminiAIChatController {

    private final GeminiAiService geminiAiService;

    public GeminiAIChatController(GeminiAiService geminiAiService) {
        this.geminiAiService = geminiAiService;
    }

    @GetMapping("/{prompt}")
    public ResponseEntity<String> geminiAIChat(@PathVariable("prompt") String prompt) {
        String response = geminiAiService.getAnswer(prompt);
        return ResponseEntity.ok(response);
    }
}
