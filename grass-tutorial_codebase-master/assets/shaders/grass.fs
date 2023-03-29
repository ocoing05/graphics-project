#version 410 core
out vec4 FragColor;


in GS_OUT {
    vec2 textCoord;
    float colorVariation;
} fs_in;

uniform sampler2D u_textgrass;

void main(){
//    vec4 color = texture(u_textgrass, fs_in.textCoord);
//    if (color.a < 0.05) discard;
    vec4 color = vec4(0.192f, 0.608f, 0.329f, 1.0f);
    color.xyz = mix(color.xyz, 0.5*color.xyz, fs_in.colorVariation);

    FragColor = color;
}
