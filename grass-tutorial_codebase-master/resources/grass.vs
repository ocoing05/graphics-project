#version 410 core
layout (location = 0) in vec3 aPos;

/*
out VS_OUT {
    
} vs_out;
*/

uniform mat4 u_projection;
uniform mat4 u_view;

float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
	// gl_Position = vec4(aPos, 1.0);
    float rand = random(aPos.xz);
    gl_Position = vec4(aPos.x + rand, aPos.y, aPos.z + rand, 1.0);
}


