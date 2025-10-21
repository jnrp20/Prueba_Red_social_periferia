package com.socialNetwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LikeUpdateDTO {
    private Long postId;
    private int likes;
}
