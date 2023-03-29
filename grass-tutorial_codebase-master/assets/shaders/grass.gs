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
} gs_out;


uniform mat4 u_projection;
uniform mat4 u_view;

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
    
    for (int i=0; i<4; i++) {
        gl_Position = u_projection * u_view * (newBasePos + crossModel * vertexPosition[i]);
        gs_out.textCoord = textCoords[i];
        EmitVertex();
    }
    EndPrimitive();
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

void createGrass()
{
    mat4 model0 = mat4(1.0f);
    mat4 model45 = rotationY(radians(45));
    mat4 modelm45 = rotationY(-radians(45));
    
    // only the first quad created appears
    createQuad(gl_in[0].gl_Position.xyz, model0);
    createQuad(gl_in[0].gl_Position.xyz, model45);
    createQuad(gl_in[0].gl_Position.xyz, modelm45);
}

void main()
{
    createGrass();
} 
