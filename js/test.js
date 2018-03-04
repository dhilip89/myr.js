function MyrTest() {
    this.a = 0;
}

MyrTest.prototype = {
    start() {
        myr = new Myr(document.getElementById("renderer"));
        myr.setClearColor(new myr.Color(0.2, 0.5, 0.7));
        
        this.surface = new myr.Surface(200, 200);
        
        this.fish = new myr.Surface("https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png");
        
        this.lastDate = new Date();
        this.animate();
    },
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        this.update(this.getTimeStep());
        this.render();
    },
    
    getTimeStep() {
        var date = new Date();
        var timeStep = (date - this.lastDate) / 1000;
        
        if(timeStep < 0)
            timeStep += 1.0;
        
        this.lastDate = date;
        
        return timeStep;
    },
    
    update(timeStep) {
        this.a += 0.01;
    },
    
    render() {
        this.surface.bind();
        this.surface.clear();
        this.fish.draw((this.surface.getWidth() -this.fish.getWidth()) / 2, (this.surface.getHeight() -this.fish.getHeight()) / 2);
        
        myr.bind();
        myr.clear();
        
        this.surface.draw(Math.cos(this.a) * 200 + 200, 200);
        
        myr.push();
        myr.translate(200, 200);
        
        const t = new myr.Transform();
        t.scale(2, 2);
        myr.transform(t);
        
        this.surface.draw(200, 200);
        
        myr.pop();
        
        this.surface.draw(200, Math.sin(this.a) * 200 + 200);
        
        this.fish.draw(0, 0);
        
        myr.flush();
    }
}

var test = new MyrTest();
test.start();