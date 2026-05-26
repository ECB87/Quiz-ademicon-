import React, { useState } from 'react';
import { Testimonial } from '../types';
import { DEFAULT_TESTIMONIALS } from '../data';
import { LucideIcon } from './LucideIcon';

export const SocialFeedback: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter((likedId) => likedId !== id));
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, likes: t.likes - 1 } : t))
      );
    } else {
      setLikedIds([...likedIds, id]);
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t))
      );
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    setIsSubmitting(true);

    // Simulate standard social network verification delay
    setTimeout(() => {
      const addedComment: Testimonial = {
        id: `user_${Date.now()}`,
        name: newCommentName,
        avatarUrl: `https://images.unsplash.com/photo-${Math.floor(1500000000000 + Math.random() * 100000000)}?auto=format&fit=crop&w=150&h=150&q=80`,
        timeAgo: 'Agora mesmo',
        rating: 5,
        content: newCommentText,
        likes: 0,
        verified: true
      };

      setTestimonials([addedComment, ...testimonials]);
      setNewCommentName('');
      setNewCommentText('');
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div id="social-feedback-container" className="w-full bg-[#121212] border border-neutral-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
        <div>
          <h4 className="text-sm font-black tracking-wider uppercase text-neutral-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
            Discussão Social Ativa
          </h4>
          <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
            Mostrando 1 a {testimonials.length} de {testimonials.length + 84} comentários reais
          </p>
        </div>
        <div className="flex items-center gap-1 bg-red-950/20 px-2 rounded-lg py-1 border border-red-900/30">
          <LucideIcon name="ThumbsUp" className="h-3 w-3 text-red-500 fill-red-500" />
          <span className="text-[10px] font-bold text-red-400 font-mono">98.9% Recomendaram</span>
        </div>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-800/80 mb-8 space-y-3">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300">
          Deixe o seu depoimento ou faça uma pergunta:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Seu nome completo..."
            value={newCommentName}
            onChange={(e) => setNewCommentName(e.target.value)}
            disabled={isSubmitting}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 text-white"
          />
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Escreva seu comentário sobre o quiz..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 text-white"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1 select-none active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LucideIcon name="Play" className="h-3 w-3 fill-white" />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Testimonials List */}
      <div className="space-y-6">
        {testimonials.map((comment) => {
          const isLiked = likedIds.includes(comment.id);
          return (
            <div
              key={comment.id}
              className="flex items-start gap-3 sm:gap-4 border-b border-neutral-900 pb-5 last:border-0 last:pb-0"
            >
              {/* Avatar placeholder with Unsplash seed or placeholder */}
              <img
                src={comment.avatarUrl}
                alt={comment.name}
                referrerPolicy="no-referrer"
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover border border-neutral-800 flex-shrink-0"
              />

              <div className="flex-grow min-w-0">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-neutral-100 truncate">{comment.name}</span>
                    <span className="flex items-center gap-0.5 bg-red-950/40 border border-red-900/30 text-[9px] text-red-500 font-bold px-1.5 py-0.2 rounded-full uppercase">
                      <LucideIcon name="Check" className="h-2 w-2 stroke-[3px]" /> verificado
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">{comment.timeAgo}</span>
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(comment.rating)].map((_, i) => (
                    <span key={i} className="text-red-600 font-bold text-sm">★</span>
                  ))}
                  <span className="text-[9px] text-neutral-400 font-mono ml-2">Recomendo</span>
                </div>

                {/* Comment body */}
                <p className="text-xs text-neutral-300 leading-relaxed font-sans pr-1">
                  {comment.content}
                </p>

                {/* Actions banner */}
                <div className="flex items-center gap-4 mt-3 pt-1 border-t border-neutral-900 text-[11px] text-neutral-400 font-mono">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 cursor-pointer transition-colors ${
                      isLiked ? 'text-red-500 font-bold hover:text-red-600' : 'hover:text-white'
                    }`}
                  >
                    <LucideIcon name="ThumbsUp" className={`h-3 w-3 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    Curtir ({comment.likes})
                  </button>
                  <span className="text-neutral-700">•</span>
                  <span className="text-neutral-500 cursor-default">Responder</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SocialFeedback;
