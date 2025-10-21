package com.socialNetwork.service;

import com.socialNetwork.entity.Post;
import com.socialNetwork.entity.User;
import com.socialNetwork.repository.PostRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;

    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post createPost(String alias, String mensaje) {
        User user = userService.findByAlias(alias);
            // .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Post post = new Post();
        post.setUser(user);
        post.setMensaje(mensaje);
        return postRepository.save(post);
    }

    public Post getPostById(Long id) {
    return postRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));
}

public Post save(Post post) {
    return postRepository.save(post);
}
}
