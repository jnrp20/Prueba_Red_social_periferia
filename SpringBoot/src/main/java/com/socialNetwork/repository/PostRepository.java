
package com.socialNetwork.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.socialNetwork.entity.Post;
import com.socialNetwork.entity.User;

public interface PostRepository extends JpaRepository<Post, Long> {

   //buscart post especificos para un usuario
    List<Post> findByUserId(User userId);
}