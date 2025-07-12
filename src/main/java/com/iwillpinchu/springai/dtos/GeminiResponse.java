package com.iwillpinchu.springai.dtos;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GeminiResponse {

    private List<Candidates> candidates;

    @Data
    public static class Candidates{
        private Content content;
    }

    @Data
    public static class Content{
        private List<Parts> parts;
    }

    @Data
    public static class Parts{
        private String text;
    }
}
