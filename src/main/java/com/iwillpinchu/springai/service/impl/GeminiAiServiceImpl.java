package com.iwillpinchu.springai.service.impl;

import com.iwillpinchu.springai.dtos.GeminiResponse;
import com.iwillpinchu.springai.service.GeminiAiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;


@Service
public class GeminiAiServiceImpl implements GeminiAiService {

    @Value("${gemini.api-url}")
    private String apiUrl;

    @Value("${gemini.api-key}")
    private String apiKey;

    private final WebClient webClient;
    public GeminiAiServiceImpl(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }
    @Override
    public String getAnswer(String prompt) {
        Map<String, Object> request = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", prompt)
                        })
                }
        );

        GeminiResponse geminiResponse =
                webClient.post()
                        .uri(apiUrl)
                        .headers(httpHeaders -> {
                            httpHeaders.add("Content-Type", "application/json");
                            httpHeaders.add("X-goog-api-key",  apiKey);
                        })
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(GeminiResponse.class)
                        .block();

        String response = geminiResponse
                .getCandidates().getFirst()
                .getContent()
                .getParts().getFirst()
                .getText();

        return response;
    }
}
