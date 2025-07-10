package com.iwillpinchu.springai.controller;

import com.iwillpinchu.springai.service.StableImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stable-image")
@CrossOrigin(origins = "http://localhost:3000")
public class StableDiffusionImageController {
    private final StableImageService stableImageService;

    public StableDiffusionImageController(StableImageService stableImageService) {
        this.stableImageService = stableImageService;
    }

    @GetMapping("/{prompt}")
    public ResponseEntity<String> stableAiImage(@PathVariable String prompt){
        String response = stableImageService.generateImage(prompt);
        return ResponseEntity.ok(response);
    }
}
