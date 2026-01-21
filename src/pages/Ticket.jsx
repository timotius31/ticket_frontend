
/*import {useEffect,useState} from 'react';
import api from '../services/api';

export default function Ticket(){
 const[floor,setFloor]=useState('FLOOR1');
 const[seats,setSeats]=useState([]);
 const[selected,setSelected]=useState([]);
 useEffect(()=>{api.get('/seats/'+floor).then(r=>setSeats(r.data));},[floor]);
 return (
  <div>
   <h1>Ticket</h1>
   <select onChange={e=>setFloor(e.target.value)}>
    <option value="FLOOR1">Floor 1</option>
    <option value="FLOOR2">Floor 2</option>
   </select>
   <div style={{display:'grid',gridTemplateColumns:'repeat(10,1fr)'}}>
    {seats.map(s=>(
     <button key={s.seat_code}
      disabled={s.status!=='available'}
      onClick={()=>setSelected([...selected,s.seat_code])}>
      {s.seat_code}
     </button>
    ))}
   </div>
  </div>
 );
} */

 /*
import { useEffect, useState } from 'react';
import api from '../services/api';

const Section = ({ title, seats, selected, onToggle }) => (
  <div style={{ marginBottom: 24 }}>
    <h3>{title}</h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gap: 6,
        maxWidth: 600
      }}
    >
      {seats.map(seat => {
        const isSelected = selected.includes(seat.seat_code);
        return (
          <button
            key={seat.seat_code}
            disabled={seat.status !== 'available'}
            onClick={() => onToggle(seat)}
            style={{
              padding: 6,
              borderRadius: 6,
              border: '1px solid #333',
              background:
                seat.status !== 'available'
                  ? '#999'
                  : isSelected
                  ? '#4CAF50'
                  : '#eee',
              color: isSelected ? '#fff' : '#000',
              cursor: seat.status !== 'available' ? 'not-allowed' : 'pointer'
            }}
          >
            {seat.seat_code}
          </button>
        );
      })}
    </div>
  </div>
);

export default function Ticket() {
  const [floor, setFloor] = useState('FLOOR1');
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    api.get('/seats/' + floor).then(res => setSeats(res.data));
  }, [floor]);

  const toggleSeat = seat => {
    const exists = selected.find(s => s.seat_code === seat.seat_code);

    if (exists) {
      setSelected(selected.filter(s => s.seat_code !== seat.seat_code));
    } else {
      if (selected.length >= 5) {
        alert('Maximum 5 seats');
        return;
      }
      setSelected([...selected, seat]);
    }
  };

  const total = selected.reduce((sum, s) => sum + s.price, 0);

  // PDF-like grouping
  const sections = floor === 'FLOOR1'
    ? [
        {
          title: 'VVIP',
          seats: seats.filter(s => s.seat_code.startsWith('A'))
        },
        {
          title: 'VIP',
          seats: seats.filter(
            s => s.seat_code.startsWith('B') || s.seat_code.startsWith('C')
          )
        },
        {
          title: 'Regular',
          seats: seats.filter(
            s =>
              !['A', 'B', 'C'].includes(s.seat_code[0])
          )
        }
      ]
    : [
        {
          title: 'Regular Floor 2',
          seats
        }
      ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Ticket Selection</h1>

      <label>
        Floor:{' '}
        <select value={floor} onChange={e => setFloor(e.target.value)}>
          <option value="FLOOR1">Floor 1</option>
          <option value="FLOOR2">Floor 2</option>
        </select>
      </label>

      <hr />

      {sections.map(sec => (
        <Section
          key={sec.title}
          title={sec.title}
          seats={sec.seats}
          selected={selected}
          onToggle={toggleSeat}
        />
      ))}

      <hr />

      <h3>Selected Seats</h3>
      {selected.length === 0 ? (
        <p>No seat selected</p>
      ) : (
        <>
          <ul>
            {selected.map(s => (
              <li key={s.seat_code}>
                {s.seat_code} – Rp {s.price.toLocaleString()}
              </li>
            ))}
          </ul>
          <h2>Total: Rp {total.toLocaleString()}</h2>

          <button
            style={{
              padding: '12px 24px',
              fontSize: 16,
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer'
            }}
            onClick={() => alert('Proceed to checkout')}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
} */

import { useEffect, useState } from 'react';
import api from '../services/api';

/* =======================
   SEAT BUTTON
======================= */
const Seat = ({ seat, selected, onToggle }) => {
  const isSelected = selected.some(s => s.seat_code === seat.seat_code);

  return (
    <button
      onClick={() => onToggle(seat)}
      disabled={seat.status !== 'available'}
      title={seat.seat_code}
      style={{
        width: 22,
        height: 22,
        fontSize: 8,
        borderRadius: 3,
        border: '1px solid #666',
        background:
          seat.status !== 'available'
            ? '#aaa'
            : isSelected
            ? '#1b5e20'
            : '#e6d2b5',
        color: isSelected ? '#fff' : '#000',
        cursor: seat.status === 'available' ? 'pointer' : 'not-allowed'
      }}
    >
      {seat.seat_code}
    </button>
  );
};

/* =======================
   GRID
======================= */
const SeatGrid = ({ seats, cols, rows, selected, onToggle }) => {
  const finalCols = cols || Math.ceil(seats.length / rows);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${finalCols}, 22px)`,
        gap: 4,
        justifyContent: 'center'
      }}
    >
      {seats.map(seat => (
        <Seat
          key={seat.seat_code}
          seat={seat}
          selected={selected}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

/* =======================
   PAGE
======================= */
export default function Ticket() {
  const [floor, setFloor] = useState('FLOOR1');
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    api.get(`/seats/${floor}`).then(res => setSeats(res.data));
    setSelected([]);
  }, [floor]);

  const toggleSeat = seat => {
    const exists = selected.find(s => s.seat_code === seat.seat_code);
    if (exists) {
      setSelected(selected.filter(s => s.seat_code !== seat.seat_code));
    } else {
      if (selected.length >= 5) {
        alert('Maximum 5 seats');
        return;
      }
      setSelected([...selected, seat]);
    }
  };

  const total = selected.reduce((sum, s) => sum + s.price, 0);

  const checkout = async () => {
  if (!selected.length) return;

  try {
    const res = await api.post('/checkout', {
      seats: selected.map(s => s.seat_code)
    });

    if (!window.snap) {
      alert('Midtrans Snap not loaded');
      return;
    }

    window.snap.pay(res.data.token, {
      onSuccess: function (result) {
        alert('Payment success');
        console.log(result);
        setSelected([]);
      },
      onPending: function (result) {
        alert('Waiting for payment');
        console.log(result);
      },
      onError: function (result) {
        alert('Payment failed');
        console.log(result);
      },
      onClose: function () {
        alert('Payment popup closed');
      }
    });
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.error || 'Checkout failed');
  }
};


  /* ========= FLOOR 1 ========= */
  const A = seats.filter(s => s.seat_code.startsWith('A'));
  const B = seats.filter(s => s.seat_code.startsWith('B'));
  const C = seats.filter(s => s.seat_code.startsWith('C'));
  const D = seats.filter(s => s.seat_code.startsWith('D'));
  const E = seats.filter(s => s.seat_code.startsWith('E'));
  const F = seats.filter(s => s.seat_code.startsWith('F'));

  const G = seats.filter(s => s.seat_code.startsWith('G'));
  const H = seats.filter(s => s.seat_code.startsWith('H'));
  const I = seats.filter(s => s.seat_code.startsWith('I'));
  const J = seats.filter(s => s.seat_code.startsWith('J'));
  const K = seats.filter(s => s.seat_code.startsWith('K'));

  /* ========= FLOOR 2 ========= */
  const L = seats.filter(s => s.seat_code.startsWith('L'));
  const M = seats.filter(s => s.seat_code.startsWith('M'));
  const N = seats.filter(s => s.seat_code.startsWith('N'));
  const O = seats.filter(s => s.seat_code.startsWith('O'));
  const P = seats.filter(s => s.seat_code.startsWith('P'));
  const Q = seats.filter(s => s.seat_code.startsWith('Q'));

  return (
    <div style={{ padding: 20 }}>
      <h2>Ticket Booking</h2>

      {/* FLOOR SELECT */}
      <select value={floor} onChange={e => setFloor(e.target.value)}>
        <option value="FLOOR1">First Floor</option>
        <option value="FLOOR2">Second Floor</option>
      </select>

      {/* SEAT MAP */}
      <div style={{ overflowX: 'auto', marginTop: 20, border: '1px solid #ccc', padding: 20 }}>
        {floor === 'FLOOR1' ? (
          <div
            style={{
              minWidth: 1700,
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr',
              gap: 40
            }}
          >
            {/* ONE */}
            <div>
              <h4>Orang Tua (G)</h4>
              <SeatGrid seats={G} cols={6} selected={selected} onToggle={toggleSeat} />
              <h4>Regular (H)</h4>
              <SeatGrid seats={H} cols={6} selected={selected} onToggle={toggleSeat} />
            </div>

            {/* TWO */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: '#d9b98c', padding: 10 }}>PANGGUNG</div>

              <h4>VVIP</h4>
              <SeatGrid seats={A.slice(0, 8)} cols={8} selected={selected} onToggle={toggleSeat} />
              <SeatGrid seats={A.slice(8, 16)} cols={8} selected={selected} onToggle={toggleSeat} />
              <SeatGrid seats={B.slice(0, 8)} cols={8} selected={selected} onToggle={toggleSeat} />
              <SeatGrid seats={B.slice(8, 16)} cols={8} selected={selected} onToggle={toggleSeat} />

              <h4 style={{ marginTop: 20 }}>VIP</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 20 }}>
                <SeatGrid seats={C} cols={4} selected={selected} onToggle={toggleSeat} />
                <SeatGrid seats={D} cols={4} selected={selected} onToggle={toggleSeat} />
                <SeatGrid seats={E} cols={4} selected={selected} onToggle={toggleSeat} />
                <SeatGrid seats={F} cols={4} selected={selected} onToggle={toggleSeat} />
              </div>
            </div>

            {/* THREE */}
            <div>
              <h4>Orang Tua (I)</h4>
              <SeatGrid seats={I} cols={6} selected={selected} onToggle={toggleSeat} />
              <h4>Regular (J)</h4>
              <SeatGrid seats={J} cols={6} selected={selected} onToggle={toggleSeat} />
            </div>

            {/* FOUR */}
            <div>
              <h4>Guru (K)</h4>
              <SeatGrid seats={K} cols={4} selected={selected} onToggle={toggleSeat} />
            </div>
          </div>
        ) : (
          <div
            style={{
              minWidth: 1600,
              display: 'grid',
              gridTemplateColumns: 'repeat(6, auto)',
              gap: 40,
              justifyContent: 'center'
            }}
          >
            <div><h4>Section 5</h4><SeatGrid seats={L} rows={5} selected={selected} onToggle={toggleSeat} /></div>
            <div><h4>Section 6</h4><SeatGrid seats={M} rows={5} selected={selected} onToggle={toggleSeat} /></div>
            <div><h4>Section 7</h4><SeatGrid seats={N} rows={5} selected={selected} onToggle={toggleSeat} /></div>
            <div><h4>Section 8</h4><SeatGrid seats={O} rows={5} selected={selected} onToggle={toggleSeat} /></div>
            <div><h4>Section 9</h4><SeatGrid seats={P} rows={5} selected={selected} onToggle={toggleSeat} /></div>
            <div><h4>Section 10</h4><SeatGrid seats={Q} rows={5} selected={selected} onToggle={toggleSeat} /></div>
          </div>
        )}
      </div>

      {/* SUMMARY */}
      <div style={{ marginTop: 20, maxWidth: 500, padding: 15, border: '1px solid #ccc' }}>
        <h3>Selected Seats</h3>

        {selected.length === 0 ? (
          <p>No seats selected</p>
        ) : (
          <>
            <ul>
              {selected.map(s => (
                <li key={s.seat_code}>
                  {s.seat_code} — Rp {s.price.toLocaleString()}
                </li>
              ))}
            </ul>
            <h3>Total: Rp {total.toLocaleString()}</h3>
          </>
        )}

        <button
          onClick={checkout}
          disabled={!selected.length}
          style={{
            padding: '10px 20px',
            background: selected.length ? '#1b5e20' : '#aaa',
            color: '#fff',
            border: 'none',
            cursor: selected.length ? 'pointer' : 'not-allowed'
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
