import React from 'react';


import PageHeader from '../../Template/PageHeader/PageHeader';

export default props => {
 return (
     <div className="container">
        <PageHeader name="Sobre" small="Nós"/>

        <section className="container d-flex ">
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium dignissim augue vel feugiat. Curabitur et vulputate nisl. 
            Phasellus gravida pellentesque ligula, non pretium sem ultrices eget. Pellentesque iaculis convallis justo, vel vulputate ligula scelerisque vitae. 
            Nunc purus tortor, lacinia sed luctus id, cursus nec turpis. Maecenas maximus quis elit quis bibendum. Praesent pellentesque tempor nibh vitae iaculis. </p>
        
            <p className="text-justify">Donec eu ipsum et tellus maximus lacinia. Cras placerat massa in quam molestie pulvinar. Donec gravida lacus rutrum porta finibus. 
            Aenean egestas felis sed pulvinar dignissim. Sed pellentesque facilisis ligula, nec accumsan magna fermentum non. Vestibulum pulvinar turpis varius odio cursus hendrerit. 
            Aliquam blandit facilisis metus, et tempus massa cursus in. Donec rhoncus sagittis nisl. Aliquam ut ultrices nunc. Maecenas venenatis et augue in pulvinar. 
            Nunc pellentesque tortor eu erat lacinia, et volutpat tellus dignissim. Vivamus vel auctor enim, non interdum nisi. Vivamus est nulla, pharetra rutrum luctus ac, ornare ut velit. 
            Donec convallis eros vel lacinia blandit.  </p>
        </section>
     </div>
     
 );   
}