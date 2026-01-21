const actors = [
  { name: 'Kenzi Wang Goenawan', img: '/actors/kenzi.jpg', desc: 'Penjelasan karakter' },
  { name: 'Cleo Clarissa Kuncoro', img: '/actors/cleo.jpg', desc: 'Penjelasan karakter' },
  { name: 'James Tjokro', img: '/actors/james.jpg', desc: 'Penjelasan karakter' },
];

export default function Actors() {
  return (
    <div className="page actors">
      <h1>About The Actors</h1>

      {actors.map(a => (
        <div key={a.name} className="actor-row">
          <div>
            <h3>{a.name}</h3>
            <p>{a.desc}</p>
          </div>
          <img src={a.img} alt={a.name} />
        </div>
      ))}
    </div>
  );
}
