package com.socialNetwork.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.socialNetwork.entity.Like;
import com.socialNetwork.entity.Post;
import com.socialNetwork.entity.User;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

   //para buscar los likes que le da un usuario a un porst en particular
    Optional<Like> findByUserIdAndPostId(Long userId, Long postId);


    //para cointar los likes de un post especifico
    int countByPost(Post postId);
}