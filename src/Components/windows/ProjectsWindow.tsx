import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Github, ExternalLink, Star, Crown } from 'lucide-react';
import { projectsData } from '../../constants/projects';
import { useSystemStore } from '../../lib/useSystemStore';

export const slugify = (name: string) => name.replace(/\s+/g, '-').toLowerCase();

const clampStyle: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

const signatureProject = projectsData.find((p) => p.signature) ?? null;
const featuredProjects = projectsData.filter((p) => p.featured && !p.signature);
const otherProjects = projectsData.filter((p) => !p.featured && !p.signature);

function ProjectCard({
  project,
  onOpen,
  featured = false,
}: {
  project: (typeof projectsData)[number];
  onOpen: () => void;
  featured?: boolean;
}) {
  return (
    <button
      onClick={onOpen}
      className={`text-left rounded-lg overflow-hidden bg-white/[0.02] transition-all ${
        featured
          ? 'border border-primary/30 hover:border-primary/60 hover:shadow-[0_0_24px_rgba(56,192,228,0.25)]'
          : 'border border-white/10 hover:border-primary/40 hover:shadow-[0_0_16px_rgba(56,192,228,0.15)]'
      }`}
    >
      {project.image && (
        <img
          src={project.image}
          alt={project.name}
          className={featured ? 'w-full h-28 object-cover' : 'w-full h-20 object-cover'}
        />
      )}
      <div className="p-2.5">
        <div className="flex items-center gap-1.5">
          {featured && <Star className="w-3 h-3 text-primary shrink-0" fill="currentColor" />}
          <div className="text-xs font-bold text-white truncate">{project.name}</div>
        </div>
        <div className="text-[10px] text-white/50 mt-0.5" style={clampStyle}>
          {project.shortDesc}
        </div>
      </div>
    </button>
  );
}

export default function ProjectsWindow() {
  const navigate = useNavigate();
  const focusedSlug = useSystemStore((s) => s.focusedProjectSlug);
  const setFocusedProjectSlug = useSystemStore((s) => s.setFocusedProjectSlug);

  const project = focusedSlug ? projectsData.find((p) => slugify(p.name) === focusedSlug) : null;

  const openProject = (name: string) => {
    setFocusedProjectSlug(slugify(name));
    navigate(`/projects/${slugify(name)}`);
  };

  if (project) {
    return (
      <div className="p-5 font-mono text-sm text-white/80 space-y-4">
        <button
          onClick={() => {
            setFocusedProjectSlug(null);
            navigate('/projects');
          }}
          className="flex items-center gap-1.5 text-xs text-primary/80 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
        </button>

        {project.image && (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-40 object-cover rounded-lg border border-primary/15"
          />
        )}

        <div>
          <div className="text-lg font-bold text-white">{project.name}</div>
          <p className="text-white/60 mt-1 leading-relaxed">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full border border-primary/25 text-[10px] text-primary bg-primary/5"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="space-y-2 text-xs text-white/60">
          <div>
            <span className="text-primary/70">Architecture — </span>
            {project.architecture}
          </div>
          <div>
            <span className="text-primary/70">Challenges — </span>
            {project.challenges}
          </div>
        </div>

        <ul className="text-xs text-white/60 list-disc list-inside space-y-1">
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <div className="flex gap-4 pt-2">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-primary hover:underline"
          >
            <Github className="w-3.5 h-3.5" /> Source
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live demo
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 font-mono space-y-6">
      {signatureProject && (
        <div>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-primary mb-2.5">
            <Crown className="w-3.5 h-3.5" fill="currentColor" /> Signature Project
          </div>
          <button
            onClick={() => openProject(signatureProject.name)}
            className="w-full text-left rounded-xl overflow-hidden border border-primary/40 bg-white/[0.02] hover:border-primary/70 hover:shadow-[0_0_32px_rgba(56,192,228,0.3)] transition-all flex flex-col md:flex-row"
          >
            {signatureProject.image && (
              <img
                src={signatureProject.image}
                alt={signatureProject.name}
                className="w-full md:w-56 h-32 md:h-auto object-cover shrink-0"
              />
            )}
            <div className="p-4 flex flex-col justify-center">
              <div className="text-sm font-bold text-white">{signatureProject.name}</div>
              <div className="text-[11px] text-white/55 mt-1 leading-relaxed">
                {signatureProject.shortDesc}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {signatureProject.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full border border-primary/25 text-[9px] text-primary bg-primary/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        </div>
      )}

      <div>
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-primary/70 mb-2.5">
          <Star className="w-3 h-3" fill="currentColor" /> Featured
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.name} project={p} featured onOpen={() => openProject(p.name)} />
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-2.5">
          Other Projects ({otherProjects.length})
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {otherProjects.map((p) => (
            <ProjectCard key={p.name} project={p} onOpen={() => openProject(p.name)} />
          ))}
        </div>
      </div>
    </div>
  );
}
