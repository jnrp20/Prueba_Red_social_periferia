package com.socialNetwork.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "likes",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"user_id", "post_id"})  //pra ewvitar que un usuario de mas de 1 like por post
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}