import BonusCard from "@/components/blessy/BonusCard";
import Callout from "@/components/blessy/Callout";

export default function S05Gamificacao() {
  return (
    <div>
      <h1 className="font-bricolage text-[1.8rem] font-extrabold text-green-dark mb-1">
        Gamificação
      </h1>
      <p className="text-[0.85rem] text-gray-500 mb-7">
        Premiação por performance — creators e time Blessy
      </p>

      <h3 className="font-bricolage text-[1.15rem] font-bold text-green-dark mt-7 mb-3.5">
        Ranking de Creators
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5 mb-6">
        <BonusCard pos="🥇 1º" name="Top Creator GMV" prize="Voucher Sephora R$ 500" icon="💄" variant="gold" />
        <BonusCard pos="🥈 2º" name="Top Creator GMV" prize="Anel Vivara" icon="💍" variant="silver" />
        <BonusCard pos="🥉 3º" name="Top Creator GMV" prize="Kit Autocuidado Spa em Casa" icon="🧖‍♀️" variant="bronze" />
      </div>

      <h3 className="font-bricolage text-[1.15rem] font-bold text-green-dark mt-7 mb-3.5">
        Bônus de Time
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5 mb-6">
        <BonusCard pos="🌼" name="Isabel — se OKR atingido" prize="R$ 500" variant="team" />
        <BonusCard pos="🌼" name="Carol — se OKR atingido" prize="R$ 500" variant="team" />
      </div>

      <Callout variant="green">
        <strong>Regra:</strong> O ranking é calculado pelo GMV total gerado por cada creator durante
        os 7 dias da War Room (03–09/04). Prêmios: 1º Voucher Sephora R$ 500, 2º Anel Vivara,
        3º Kit Autocuidado Spa em Casa. Felipe anuncia os resultados no grupo ao encerrar a
        campanha. O bônus de time é pago somente se o OKR de <strong>R$ 196.991</strong> for
        atingido.
      </Callout>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
