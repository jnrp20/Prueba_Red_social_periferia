package com.socialNetwork.security;


import com.socialNetwork.entity.User;
import com.socialNetwork.repository.UserRepository;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String alias) throws UsernameNotFoundException {
        User user = userRepository.findByAlias(alias)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getAlias())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}