package com.iwillpinchu.springai.service.impl;

import com.iwillpinchu.springai.service.OpenAiService;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class OpenAiServiceImpl implements OpenAiService {

    private final OpenAiChatModel chatmodel;
    private final OpenAiImageModel openaiImageModel;

    public OpenAiServiceImpl(@Qualifier("openAiChatModel") OpenAiChatModel chatmodel, OpenAiImageModel openaiImageModel) {
        this.chatmodel = chatmodel;
        this.openaiImageModel = openaiImageModel;
    }

    @Override
    public String getAnswer(String prompt) {
        return chatmodel.call(prompt);
    }

    @Override
    public ImageResponse getImage(String prompt) {
        ImageResponse response = openaiImageModel.call(
                new ImagePrompt("A light cream colored mini golden doodle",
                        OpenAiImageOptions.builder()
                                .quality("standard")
                                .N(1)
                                .height(1024)
                                .width(1024).build())
        );
        return response;
    }
}
