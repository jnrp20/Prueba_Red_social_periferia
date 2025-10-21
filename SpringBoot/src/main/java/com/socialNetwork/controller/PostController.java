package com.socialNetwork.controller;

import com.socialNetwork.dto.PostRequest;
import com.socialNetwork.entity.Post;
import com.socialNetwork.service.PostService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController// permite solicitudes desde tu frontend
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }
    @CrossOrigin(origins = "http://localhost:3000") 
    
    @GetMapping
    public ResponseEntity<?> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }
    @CrossOrigin(origins = "http://localhost:3000") 
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest) {
        try {
            Post post = postService.createPost(postRequest.getAlias(), postRequest.getMensaje());
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
