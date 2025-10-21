package com.socialNetwork.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.socialNetwork.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    //para buscar un usurio por alias
    Optional<User> findByAlias(String alias);

    //oara validar si existe un alias
    boolean existsByAlias(String alias);

  
}
