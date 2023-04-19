#version 410 core

layout (points) in;
layout (triangle_strip) out; // triangle strip
layout (max_vertices = 3) out;

/*
in VS_OUT {
    
} gs_in[];
 */
out GS_OUT {
    vec2 textCoord;
} gs_out;

uniform mat4 u_projection;
uniform mat4 u_view;

float grassHeight;
float grassWidth;
const float minHeight = 0.5f;
const float maxHeight = 1.0f;
const float minWidth = 0.05f;
const float maxWidth = 0.1f;

float PI = 3.141592653589793;

float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

mat4 rotationY(float rad)
{
    mat4 rotMatrix;
    rotMatrix[0] = vec4(cos(rad), 0, -sin(rad), 0); // first col
    rotMatrix[1] = vec4(0,1,0,0);
    rotMatrix[2] = vec4(sin(rad), 0, cos(rad), 0);
    rotMatrix[3] = vec4(0,0,0,1);
    
    return rotMatrix;
}

mat4 rotationX(float rad)
{
    mat4 rotMatrix;
    rotMatrix[0] = vec4(1,0,0,0); // first col
    rotMatrix[1] = vec4(0,cos(rad),sin(rad),0);
    rotMatrix[2] = vec4(0, -sin(rad), cos(rad), 0);
    rotMatrix[3] = vec4(0,0,0,1);
    
    return rotMatrix;
}

void main()
{
    mat4 modelRandY = rotationY(random(gl_in[0].gl_Position.zx)*2*PI);
    mat4 modelRandX = rotationX(random(gl_in[0].gl_Position.xz)*PI*0.5);
    
    grassHeight = random(gl_in[0].gl_Position.xz) * (maxHeight - minHeight) + minHeight;
    grassWidth = random(gl_in[0].gl_Position.xz) * (maxWidth - minWidth) + minWidth;
    
    gl_Position = u_projection * u_view * (gl_in[0].gl_Position + vec4(grassWidth/2, 0, 0, 1) * modelRandY * modelRandX);
    gs_out.textCoord = vec2(0,1);
    EmitVertex();
    
    gl_Position = u_projection * u_view * (gl_in[0].gl_Position + vec4(-grassWidth/2, 0, 0, 1) * modelRandY * modelRandX);
    gs_out.textCoord = vec2(1,1);
    EmitVertex();
    
    gl_Position = u_projection * u_view * (gl_in[0].gl_Position + vec4(0, grassHeight, 0, 1) * modelRandY * modelRandX);
    gs_out.textCoord = vec2(0.5,0);
    EmitVertex();

    EndPrimitive();
} 
