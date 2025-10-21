package com.socialNetwork.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.socialNetwork.entity.Like;
import com.socialNetwork.entity.Post;
import com.socialNetwork.entity.User;
import com.socialNetwork.repository.LikeRepository;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostService postService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    public LikeService(
        LikeRepository likeRepository,
        PostService postService,
        UserService userService,
        SimpMessagingTemplate messagingTemplate
    ) {
        this.likeRepository = likeRepository;
        this.postService = postService;
        this.userService = userService;
        this.messagingTemplate = messagingTemplate;
    }

    
public void likePost(String alias, Long postId) {
    User user = userService.findByAlias(alias);
    Post post = postService.getPostById(postId);

    // ✅ Buscar si ya existe el like por IDs
    if (likeRepository.findByUserIdAndPostId(user.getId(), post.getId()).isPresent()) {
        throw new RuntimeException("Ya diste like a esta publicación");
    }

    // Crear nuevo like
    Like like = new Like();
    like.setUser(user);
    like.setPost(post);
    likeRepository.save(like);

    // Incrementar contador de likes en el post
    post.setLikes(post.getLikes() + 1);
    postService.save(post);
}

    public int countLikes(Long postId) {
        Post post = postService.getPostById(postId);
        return likeRepository.countByPost(post);
    }

    public static class LikeUpdateDTO {
        private Long postId;
        private int likes;

        public LikeUpdateDTO(Long postId, int likes) {
            this.postId = postId;
            this.likes = likes;
        }

        public Long getPostId() {
            return postId;
        }

        public int getLikes() {
            return likes;
        }
    }
}
