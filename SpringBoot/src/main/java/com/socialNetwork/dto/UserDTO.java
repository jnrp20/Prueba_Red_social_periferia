// package com.socialNetwork.dto;
package com.socialNetwork.dto;

import com.socialNetwork.entity.User;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String alias;
    private String fechaNacimiento;

    public UserDTO(User user) {
        this.id = user.getId();
        this.nombre = user.getNombre();
        this.apellido = user.getApellido();
        this.alias = user.getAlias();
        this.fechaNacimiento = user.getFechaNacimiento();
    }
}
