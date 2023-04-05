#version 410 core

layout (points) in;
//layout (points) out;
layout (triangle_strip, max_vertices = 36) out;

/*
in VS_OUT {
    
} gs_in[];
 */
out GS_OUT {
    vec2 textCoord;
    float colorVariation;
} gs_out;


uniform mat4 u_projection;
uniform mat4 u_view;
uniform vec3 u_cameraPosition;

const float PI = 3.141592653589793;
float grass_size;
const float c_min_size = 0.8f;
const float LOD1 = 5.0f;
const float LOD2 = 10.0f;
const float LOD3 = 20.0f;

mat4 rotationY(in float angle);
float random (vec2 st);
float fbm ( in vec2 _st);

void createQuad(vec3 basePos, mat4 crossModel)
{
    vec4 newBasePos = vec4(basePos.x, basePos.y, basePos.z, 1.0);
    vec4 vertexPosition[4];
    vertexPosition[0] = vec4(-0.2,0.0,0.0,0.0);
    vertexPosition[1] = vec4(0.2,0.0,0.0,0.0);
    vertexPosition[2] = vec4(-0.2,0.2,0.0,0.0);
    vertexPosition[3] = vec4(0.2,0.2,0.0,0.0);
    
    vec2 textCoords[4];
    textCoords[0] = vec2(0.0,0.0);
    textCoords[1] = vec2(1.0,0.0);
    textCoords[2] = vec2(0.0,1.0);
    textCoords[3] = vec2(1.0,1.0);
    
    mat4 modelRandY = rotationY(random(newBasePos.zx)*PI);
    
    for (int i=0; i<4; i++) {
        gl_Position = u_projection * u_view * (newBasePos + modelRandY * crossModel * (grass_size * vertexPosition[i]));
        gs_out.textCoord = textCoords[i];
        gs_out.colorVariation = fbm(gl_in[0].gl_Position.xz);
        EmitVertex();
    }
    EndPrimitive();
}

void createGrass(int numQuads)
{
    mat4 model0 = mat4(1.0f);
    mat4 model45 = rotationY(radians(45));
    mat4 modelm45 = rotationY(-radians(45));
    
    // LOD logic
    switch(numQuads){
        case 1: {
            createQuad(gl_in[0].gl_Position.xyz, model0);
            break;
        }
        case 2: {
            createQuad(gl_in[0].gl_Position.xyz, model45);
            createQuad(gl_in[0].gl_Position.xyz, modelm45);
            break;
        }
        case 3: {
            createQuad(gl_in[0].gl_Position.xyz, model0);
            createQuad(gl_in[0].gl_Position.xyz, model45);
            createQuad(gl_in[0].gl_Position.xyz, modelm45);
            break;
        }
    }
    
    // only the first quad created appears
    createQuad(gl_in[0].gl_Position.xyz, model0);
    createQuad(gl_in[0].gl_Position.xyz, model45);
    createQuad(gl_in[0].gl_Position.xyz, modelm45);
}

void main()
{
    vec3 distanceCamera = gl_in[0].gl_Position.xyz - u_cameraPosition;
    float distanceLength = length(distanceCamera);
    grass_size = random(gl_in[0].gl_Position.xz) * (1.0f - c_min_size) + c_min_size;
    
    float t = 6.0f;
    if (distanceLength > LOD2) { t*= 1.5f; }
    int lessDetails = 3;
    if (distanceLength > LOD1) lessDetails = 2;
    if (distanceLength > LOD2) lessDetails = 1;
    if (distanceLength > LOD3) lessDetails = 0;
    if (lessDetails != 1
      || (lessDetails == 1 && (int(gl_in[0].gl_Position.x * 10) % 1) == 0
      || (int(gl_in[0].gl_Position.z * 10) % 1) == 0)
      || (lessDetails == 2 && (int(gl_in[0].gl_Position.x * 5) % 1) == 0
      || (int(gl_in[0].gl_Position.z * 5) % 1) == 0)
    )
    { createGrass(lessDetails); }
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

/**  ***   helper functions below provided by Vulpinii tutorial  ***    **/
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
    (c - a)* u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
}
#define NUM_OCTAVES 5
float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}
