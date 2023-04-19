#version 410 core
out vec4 FragColor;


in GS_OUT {
    vec2 textCoord;
} fs_in;

vec4 bottomColor = vec4(0.16, 0.38, 0.21, 1.0);
vec4 topColor = vec4(0.33, 0.76, 0.41, 1.0);

void main(){
    FragColor = mix(topColor, bottomColor, fs_in.textCoord.y);
	//FragColor = vec4(0.192f, 0.608f, 0.329f, 1.0f);
}
