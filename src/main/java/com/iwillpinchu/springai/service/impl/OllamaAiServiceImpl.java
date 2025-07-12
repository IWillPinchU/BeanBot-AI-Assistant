package com.iwillpinchu.springai.service.impl;

import com.iwillpinchu.springai.service.OllamaAiService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class OllamaAiServiceImpl implements OllamaAiService {

    private final ChatClient chatClient;
    private final OllamaChatModel chatModel;
    public OllamaAiServiceImpl(@Qualifier("ollamaChatModel") OllamaChatModel chatModel) {
        this.chatModel = chatModel;
        this.chatClient = ChatClient.create(chatModel);
    }

    @Override
    public String getAnswer(String prompt) {
        String response = chatClient
                .prompt(prompt)
                .call()
                .content();
        return response.replaceAll("(?s)<think>.*?</think>", "").trim();
    }
}
