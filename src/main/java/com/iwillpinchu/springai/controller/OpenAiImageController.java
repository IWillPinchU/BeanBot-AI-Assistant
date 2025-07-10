package com.iwillpinchu.springai.controller;

import com.iwillpinchu.springai.service.OpenAiService;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/openai-image")
@CrossOrigin(origins = "http://localhost:3000")
public class OpenAiImageController {

    private final OpenAiService openAiImageService;
    public OpenAiImageController(OpenAiService openAiImageService) {
        this.openAiImageService = openAiImageService;
    }

    @GetMapping("{prompt}")
    public ResponseEntity<ImageResponse> imageGenerator(@PathVariable(required = true) String prompt) {
        ImageResponse imageResponse = openAiImageService.getImage(prompt);
        return ResponseEntity.ok(imageResponse);
    }
}

//no money to run this
