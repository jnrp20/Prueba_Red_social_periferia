// package com.socialNetwork.dto;

package com.socialNetwork.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostRequest {
    private String alias;
    private String mensaje;
}
