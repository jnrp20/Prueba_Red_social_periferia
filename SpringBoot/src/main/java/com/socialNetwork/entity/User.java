package com.socialNetwork.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String nombre;

    @Column(length = 100, nullable = false)
    private String apellido;

    @Column(unique = true, nullable = false)
    private String alias;

    @Column(nullable = false)
    private String password;

    @Column(name = "fecha_nacimiento")
    private String fechaNacimiento;
}