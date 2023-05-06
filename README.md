# Graphics Project: Rendering Grass and Simulating Wind

## Ingrid O'Connor & Quentin Harrington

For both methods, nearly all of the code we wrote is found in the grass.gs file, though there are also some smaller changes in grass.vs, main.cpp, and grass.fs.

### Billboarding Method
The code for our billboarding method of rendering grass can be found in the folder titled "grass-tutorial_codebase-master".
Once the project is opened in Xcode, you should be able to just run it and see the billboarded grass field with animated wind.

### Individual Blades Method
The code for our individual grass blades method can be found in the folder titled "grass-blades".
Once the project is opened in Xcode, you should be able to just run it and see the grass field with animated wind.

### Changing Parameters
In either of the methods, you can change both the size of the grass field and the density of the field by changing lines 121 and 122 in the main.cpp file. This is where the original vertices are created (one vertex becomes one clump of grass for the first method, or one vertex becomes one grass blade for the second method).

Some parameters may be changed at the top of grass.gs to change the appearance of the field of grass. For example, min and max height and width. In the individual grass blades method, bladeForward, and bladeCurve can also be changed. The amount of segments per blade can also be increase or decreased to impact how smooth the curve appears. 

It is also possible to change the wind animation by using a different wind map texture.
