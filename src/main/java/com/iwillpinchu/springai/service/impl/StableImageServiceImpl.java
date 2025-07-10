package com.iwillpinchu.springai.service.impl;


import com.iwillpinchu.springai.service.StableImageService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class StableImageServiceImpl implements StableImageService {
    @Override
    public String generateImage(String prompt) {
        String apiUrl = "http://localhost:7860/sdapi/v1/txt2img";

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> request = Map.of("prompt", prompt, "steps", 20);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        Map<String, Object> response = restTemplate.postForObject(apiUrl, entity, Map.class);
        String base64Image = ((List<String>) response.get("images")).get(0);

        byte[] imageBytes = Base64.getDecoder().decode(base64Image);
        return fileSaver(imageBytes);
    }

    private String fileSaver(byte[] imageBytes){
        String fileName = "image_" + UUID.randomUUID() + ".png";
        Path imageDir = Paths.get("generated");
        Path imagePath = imageDir.resolve(fileName);
        try {
            Files.createDirectories(imageDir);
            Files.write(imagePath, imageBytes);
        }
        catch (IOException e){
            e.printStackTrace();
        }
        String imageUrl = "http://localhost:8000/generated/" + fileName;
        return imageUrl;
    }
}
