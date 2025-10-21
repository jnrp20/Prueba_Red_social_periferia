package com.socialNetwork.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.socialNetwork.dto.UserDTO;
import com.socialNetwork.entity.User;
import com.socialNetwork.service.UserService;

import lombok.AllArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    
 private final UserService userService;

@CrossOrigin(origins = "http://localhost:3000") 
@GetMapping
public List<User> getAllUsers() {
    return userService.findAll();
}

@CrossOrigin(origins = "http://localhost:3000") 
@GetMapping("/me")
public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
    // Aquí asumimos que el alias se usa como username en la autenticación
    User user = userService.findByAlias(userDetails.getUsername());
    return ResponseEntity.ok(new UserDTO(user));
}

}
