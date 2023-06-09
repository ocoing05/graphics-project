#version 410 core

layout (points) in;
layout (triangle_strip) out; // triangle strip
layout (max_vertices = 7) out;

/*
in VS_OUT {
    
} gs_in[];
 */
out GS_OUT {
    vec2 textCoord;
} gs_out;

uniform mat4 u_projection;
uniform mat4 u_view;
uniform sampler2D u_wind;
uniform float u_time;

float grassHeight;
float grassWidth;
const float minHeight = 0.5f;
const float maxHeight = 1.0f;
const float minWidth = 0.05f;
const float maxWidth = 0.1f;
const float bladeForward = 0.38f;
const float bladeCurve = 2.0f;
const float BLADE_SEGMENTS = 3.0f;

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

mat4 rotationZ(float rad)
{
    mat4 rotMatrix;
    rotMatrix[0] = vec4(cos(rad),sin(rad),0,0); // first col
    rotMatrix[1] = vec4(-sin(rad),cos(rad),0,0);
    rotMatrix[2] = vec4(0,0,1,0);
    rotMatrix[3] = vec4(0,0,0,1);
    
    return rotMatrix;
}

void generateGrassVertex(vec4 pos, vec2 uv, mat4 transformMatrix)
{
    gl_Position = u_projection * u_view * (gl_in[0].gl_Position + transformMatrix * pos);
    gs_out.textCoord = uv;
}

void main()
{
    grassHeight = random(gl_in[0].gl_Position.xz) * (maxHeight - minHeight) + minHeight;
    grassWidth = random(gl_in[0].gl_Position.xz) * (maxWidth - minWidth) + minWidth;
    
    float forward = random(gl_in[0].gl_Position.yz) * bladeForward;
    
    mat4 modelRandY = rotationY(random(gl_in[0].gl_Position.zx)*2*PI);
    mat4 modelRandX = rotationX(random(gl_in[0].gl_Position.xz)*PI*0.2);
    
    // wind
    vec2 windDirection = vec2(1.0, 1.0);
    float windStrength = 0.1f;
    vec2 uv = gl_in[0].gl_Position.xz/40.0 + windDirection * windStrength * u_time;
    uv.x = mod(uv.x, 1.0);
    uv.y = mod(uv.y,1.0);
    vec4 wind = texture(u_wind, uv);
    mat4 modelWind = (rotationX(wind.x*PI*0.75f - PI*0.25f) * rotationZ(wind.y*PI*0.75f - PI*0.25f));
    
    for (int i = 0; i < BLADE_SEGMENTS; i++)
    {
        float t = i / BLADE_SEGMENTS;
        float segmentHeight = grassHeight * t;
        float segmentWidth = grassWidth * (1 - t);
        float segmentForward = pow(t, bladeCurve) * forward;
        mat4 transform;
        if (i == 0) {
            transform = modelRandY * modelRandX;
        } else {
            transform = modelWind * modelRandY * modelRandX;
        }
        generateGrassVertex(vec4(segmentWidth, segmentHeight, segmentForward, 1), vec2(0,abs(t-1)), transform);
        EmitVertex();
        generateGrassVertex(vec4(-segmentWidth, segmentHeight, segmentForward, 1), vec2(1,abs(t-1)), transform);
        EmitVertex();
    }
    
    generateGrassVertex(vec4(0, grassHeight, forward, 1), vec2(0.5,0), modelWind * modelRandY * modelRandX);
    EmitVertex();

    EndPrimitive();
} 
