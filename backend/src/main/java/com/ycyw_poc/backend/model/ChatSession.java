package com.ycyw_poc.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "chat_sessions")
@Data
public class ChatSession {
    @Id
    private String id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    // Status: OPEN, CLOSED
    private String status;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<ChatMessage> messages;
}