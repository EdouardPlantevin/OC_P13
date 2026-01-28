package com.ycyw_poc.backend.model;

public class ChatMessage {
    private String content;
    private String sender;
    private String times;


    public ChatMessage(String content, String sender, String times) {
        this.content = content;
        this.sender = sender;
        this.times = times;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }
    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getTimes() {
        return times;
    }
    public void setTimes(String times) {
        this.times = times;
    }
}
