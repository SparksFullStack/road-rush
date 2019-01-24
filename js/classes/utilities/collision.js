class Collision {
    static checkColide(obj1, obj2){
        // here we'll subtract the x of object 1 from the x of object 2 and use the abs method to remove the negative sign if present
        const distX = Math.abs(ob1.x - obj2.x);
        const distY = Math.abs(obj1.y - obj2.y);

        // if the distance is less than half the width AND height of the object, that means that they have collided
        if (distX < obj1.width / 2){
            if (distY < obj1.height / 2) return true;
        } else return false;
    }
}