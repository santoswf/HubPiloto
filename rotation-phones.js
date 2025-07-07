const carrossel = document.getElementById("carrossel");
      let angulo = 0;
      let autoRotate = true;

      // Função para girar automaticamente
      function girarAutomaticamente() {
        if (autoRotate) {
          angulo += 0.1; 
          carrossel.style.transform = `rotateY(-${angulo}deg)`;
        }
        requestAnimationFrame(girarAutomaticamente);
      }

      girarAutomaticamente(); 

      // Controles com mouse e touch
      let isDragging = false;
      let startX = 0;
      let currentAngle = 0;

      function startDrag(x) {
        isDragging = true;
        autoRotate = false; 
        startX = x;
        currentAngle = angulo;
      }

      function duringDrag(x) {
        if (!isDragging) return;
        const delta = x - startX;
        angulo = currentAngle - delta * 0.3; // sensibilidade do arraste
        carrossel.style.transform = `rotateY(-${angulo}deg)`;
      }

      function endDrag() {
        isDragging = false;
        autoRotate = true; 
      }

      // Eventos para desktop
      carrossel.addEventListener("mousedown", (e) => startDrag(e.clientX));
      document.addEventListener("mousemove", (e) => duringDrag(e.clientX));
      document.addEventListener("mouseup", endDrag);

      // Eventos para celular/tablet
      carrossel.addEventListener("touchstart", (e) =>
        startDrag(e.touches[0].clientX)
      );
      document.addEventListener("touchmove", (e) =>
        duringDrag(e.touches[0].clientX)
      );
      document.addEventListener("touchend", endDrag);