package com.socialNetwork.service;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.socialNetwork.entity.User;
import com.socialNetwork.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

   public User findByAlias(String alias) {
    return userRepository.findByAlias(alias)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado con alias: " + alias));
}

    public boolean aliasExists(String alias) {
        return userRepository.existsByAlias(alias);
    }

    public User registerUser(User user) {
        if (aliasExists(user.getAlias())) {
            throw new RuntimeException("El alias ya está en uso");
        }
        return userRepository.save(user);
    }

    public User login(String alias, String password) {
        User user = userRepository.findByAlias(alias)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return user;
    }

    public List<User> findAll(){

        return userRepository.findAll();
    };

 
}