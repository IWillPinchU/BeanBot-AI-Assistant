package com.iwillpinchu.springai.service;

import org.springframework.ai.image.ImageResponse;

public interface OpenAiService {
    public String getAnswer(String prompt);

    ImageResponse getImage(String prompt);
}
