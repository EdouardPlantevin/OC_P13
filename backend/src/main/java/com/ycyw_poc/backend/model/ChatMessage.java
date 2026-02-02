package com.ycyw_poc.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "chat_messages")
@Data
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private String sender;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "session_id")
    @JsonIgnore
    private ChatSession session;

    /** Format HH:mm pour le frontend (propriété "times"). */
    public String getTimes() {
        return timestamp == null ? "" : timestamp.format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}