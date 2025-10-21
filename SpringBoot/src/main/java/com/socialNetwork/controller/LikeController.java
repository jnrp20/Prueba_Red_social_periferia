package com.socialNetwork.controller;

import org.springframework.web.bind.annotation.*;

import com.socialNetwork.service.LikeService;

@RestController
@RequestMapping("/likes")
@CrossOrigin(origins = "http://localhost:3000") // para tu frontend React local
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }


  
}